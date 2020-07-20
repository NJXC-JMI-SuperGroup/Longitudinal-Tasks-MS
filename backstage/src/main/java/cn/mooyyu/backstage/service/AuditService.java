package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;

import cn.mooyyu.backstage.pojo.AuditResult;
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
//    public List<ExpertAccount> getAccountList(int declareId){
//        return this.auditDao.getAccountList();
//    }

    //外审账号
//    public void getAccount(int declareId) {
//
//    }

    //循环遍历取出外审账号的 username 和 password
//    public void testGetAccount() {
//
//        List<Map<String, Object>> listMaps = new ArrayList<Map<String, Object>>();
//        for (Map<String, Object> map : listMaps) {
//            //循环map里面的每一对键值对，然后获取key和value
//            for (Map.Entry<String, Object> m : map.entrySet()) {
//                System.out.print(m.getKey() + "    "+m.getValue());
//            }
//        }
//    }

    // num:需要生成的账号数目
    // length：账号长度
    private static final StringBuffer password = new StringBuffer();
    private static final StringBuffer username = new StringBuffer();
    public static void getAccount(){
        String number = "0123456789";
        String allsymbol = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-{}<>.*";
        int accountlen = 6;
        int pwdlen = 8;
        for (int i = 0; i < accountlen;i++) {
            Random random = new Random();
            int u = random.nextInt(number.length() + 1);
            char one = allsymbol.charAt(u);
            username.append(one);
        }
        for (int i = 0; i < pwdlen;i++) {
            Random random = new Random();
            int p = random.nextInt(allsymbol.length()+ 1);
            char one = allsymbol.charAt(p);
            password.append(one);
        }
        username.toString();
        password.toString();
    }
}

