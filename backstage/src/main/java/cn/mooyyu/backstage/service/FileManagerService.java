package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.pojo.Chunk;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class FileManagerService {
    private static final File tmpBulletinDir = new File("TmpFile", "bulletin");
    private static final File StaticBulletinDir = new File("StaticFile", "bulletin");
    private static final int  BUFFER_SIZE = 2 * 1024;

    public boolean uploadFiles(Chunk chunk, HttpServletRequest request) {
        String folderPath = new File(tmpBulletinDir, request.getRequestedSessionId()).getPath();
        MultipartFile file = chunk.getFile();
        String filename = chunk.getFilename();
        try {
            byte[] bytes = file.getBytes();
            if (!Files.isWritable(Paths.get(folderPath))) {
                Files.createDirectories(Paths.get(folderPath));
            }
            Path path = Paths.get(folderPath,filename);
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public void getAddition(HttpServletResponse response, String filename) {
        try {
            OutputStream os = response.getOutputStream();
            FileInputStream fis = new FileInputStream(new File("StaticFile", filename));
            BufferedInputStream bis = new BufferedInputStream(fis);
            byte[] buffer = new byte[bis.available()];
            int i = bis.read(buffer);
            while(i != -1){
                os.write(buffer, 0, i);
                i = bis.read(buffer);
            }
            bis.close();
            fis.close();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean moveFiles(HttpServletRequest request, int bulletinId, List<String> filenames) {
        File rawDir = new File(tmpBulletinDir, request.getRequestedSessionId());
        File targetDir = new File(StaticBulletinDir, String.valueOf(bulletinId));
        if (!cleanDir(targetDir)) {
            return false;
        }
        if (filenames.size() == 0) {
            return true;
        }
        if (!targetDir.exists()) {
            try {
                Files.createDirectories(Paths.get(targetDir.getAbsolutePath()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        for (String filename : filenames) {
            try {
                Files.move(
                        Paths.get(new File(rawDir, filename).getAbsolutePath()),
                        Paths.get(new File(targetDir, filename).getAbsolutePath())
                );
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }
        if (!cleanDir(rawDir)) {
            return false;
        }
        try {
            toZip(targetDir.getAbsolutePath(), new FileOutputStream(
                    new File(StaticBulletinDir, bulletinId + ".zip")
            ), true);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return false;
        }
        return cleanDir(targetDir);
    }

    private boolean cleanDir(File dir) {
        if (!dir.exists()) return true;
        for (String file : Objects.requireNonNull(dir.list())) {
            if (!new File(dir, file).delete()) return false;
        }
        return dir.delete();
    }

    public static void toZip(String srcDir, OutputStream out, boolean KeepDirStructure)
            throws RuntimeException{
        long start = System.currentTimeMillis();
        ZipOutputStream zos = null ;
        try {
            zos = new ZipOutputStream(out);
            File sourceFile = new File(srcDir);
            compress(sourceFile,zos,sourceFile.getName(),KeepDirStructure);
            long end = System.currentTimeMillis();
            System.out.println("压缩完成，耗时：" + (end - start) +" ms");
        } catch (Exception e) {
            throw new RuntimeException("zip error from ZipUtils",e);
        }finally{
            if(zos != null){
                try {
                    zos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static void compress(File sourceFile, ZipOutputStream zos, String name, boolean KeepDirStructure)
            throws Exception{
        byte[] buf = new byte[BUFFER_SIZE];
        if(sourceFile.isFile()){
            // 向zip输出流中添加一个zip实体，构造器中name为zip实体的文件的名字
            zos.putNextEntry(new ZipEntry(name));
            // copy文件到zip输出流中
            int len;
            FileInputStream in = new FileInputStream(sourceFile);
            while ((len = in.read(buf)) != -1){
                zos.write(buf, 0, len);
            }
            // Complete the entry
            zos.closeEntry();
            in.close();
        } else {
            File[] listFiles = sourceFile.listFiles();
            if(listFiles == null || listFiles.length == 0){
                // 需要保留原来的文件结构时,需要对空文件夹进行处理
                if(KeepDirStructure){
                    // 空文件夹的处理
                    zos.putNextEntry(new ZipEntry(name + "/"));
                    // 没有文件，不需要文件的copy
                    zos.closeEntry();
                }
            }else {
                for (File file : listFiles) {
                    // 判断是否需要保留原来的文件结构
                    if (KeepDirStructure) {
                        // 注意：file.getName()前面需要带上父文件夹的名字加一斜杠,
                        // 不然最后压缩包中就不能保留原来的文件结构,即：所有文件都跑到压缩包根目录
                        compress(file, zos, name + "/" + file.getName(), true);
                    } else {
                        compress(file, zos, file.getName(), false);
                    }

                }
            }
        }
    }
}