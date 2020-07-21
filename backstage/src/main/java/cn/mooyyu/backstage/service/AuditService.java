package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;

import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.ExpertAccount;
import cn.mooyyu.backstage.pojo.SimpleDeclare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class AuditService {
    private final AuditDao auditDao;
    @Autowired
    public AuditService(AuditDao auditDao) {
        this.auditDao = auditDao;
    }

    public List<SimpleDeclare> getProjectList(){
        return this.auditDao.getProjectList();
    }

    public AuditResult getAuditResult(int declareId){
        return this.auditDao.getAuditResult(declareId);
    }

    public void addAuditResult(int declareId,int expertScore,String expertSuggestion){
        this.auditDao.addAuditResult(declareId,expertScore,expertSuggestion);
    }

  public void  addRejectReson(int declareId,String rejectReason){
        this.auditDao.addRejectReson(declareId,rejectReason);
    }
//    public Integer getAccountNumber(int declareId){
//        return this.auditDao.getAccountNumber(declareId);
//    }

    //循环遍历取出外审账号的 username 和 password
    public List<Map<String, Object>> getAccountList(int declareId){
        return this.auditDao.getAccountList(declareId);
    }

    //外审账号
//    public void getAccount(int declareId) {
//
//    }


    // 随机生成账号
    // num 需生成账号数量
    public static List<String> getUserIds(List<String> oldUserIds,int num){
        String number = "0123456789";
        List<String> ids=new ArrayList<String>();
        while(ids.size()<num){
            StringBuffer userId = new StringBuffer();
            // 限制账号长度为 6
            for (int i = 0; i < 6;i++) {
                Random random = new Random();
                int u = random.nextInt(number.length() + 1);
                char one = number.charAt(u);
                userId.append(one);
            }
            String userName=userId.toString();
            if(oldUserIds.contains(userName)||ids.contains(userName)){
                //已存在，重新生成一个

            }else{
                ids.add(userName);
            }
        }
        return ids;
    }

    // 随机生成密码
    // num 需生成账号数量
    public static List<String> getPasswords(int num){
        String allsymbol = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-{}<>.*";
        List<String> pwd =new ArrayList<String>();
        while(pwd.size()<num){
            StringBuffer sb = new StringBuffer();
            // 限制账号长度为 6
            for (int i = 0; i < 8;i++) {
                Random random = new Random();
                int u = random.nextInt(allsymbol.length() + 1);
                char one = allsymbol.charAt(u);
                sb.append(one);
            }
            String password=sb.toString();
            pwd.add(password);
        }
        return pwd;
    }

}

