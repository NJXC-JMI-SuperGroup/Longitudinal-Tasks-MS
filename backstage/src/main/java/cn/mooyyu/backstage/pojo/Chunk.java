package cn.mooyyu.backstage.pojo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.io.Serializable;

@Data
public class Chunk implements Serializable {
    Long id;
    Integer chunkNumber;
    Long chunkSize;
    Long currentChunkSize;
    Long totalSize;
    String identifier;
    String filename;
    String relativePath;
    Integer totalChunks;
    String type;
    MultipartFile file;
}