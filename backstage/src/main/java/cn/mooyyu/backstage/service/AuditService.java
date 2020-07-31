package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;
import cn.mooyyu.backstage.dao.ExpertAccountDao;
import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.pojo.expert.ExpertAccount;
import cn.mooyyu.backstage.pojo.expert.ExpertAudit;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.NumberFormat;
import java.util.List;
import java.util.Random;

@Service
public class AuditService {
    private final AuditDao auditDao;
    private final ExpertAccountDao expertAccountDao;

    @Autowired
    public AuditService(AuditDao auditDao, ExpertAccountDao expertAccountDao) {
        this.auditDao = auditDao;
        this.expertAccountDao = expertAccountDao;
    }

    public List<SimpleDeclare> getDeclareList() {
        return this.auditDao.getDeclareList();
    }

    public List<SimpleDeclare> getDeclareListForExpert(boolean limit, HttpServletRequest request) {
        if (limit) {
            AccountState state = (AccountState) request.getSession().getAttribute("accountState");
            return state == null ? null : this.auditDao.getDeclareListForExpertAudit(state.getBulletinId());
        } else {
            return this.auditDao.getDeclareListForExpert();
        }
    }

    public boolean departAudit(int declareId, int stateId, String rejectionReason) {
        try {
            this.auditDao.updateDeclareState(declareId, stateId);
            if (stateId == 1) {
                this.auditDao.setRejectionReason(declareId, rejectionReason);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public List<ExpertAccount> createExpertAccount(int bulletinId, int cnt) {
        try {
            String username;
            String password;
            String title = this.expertAccountDao.getExpertTitle(bulletinId);

            while (cnt-- > 0) {
                StringBuilder pybf = new StringBuilder();
                char[] arr = title.toCharArray();
                HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
                defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
                defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
                for (char c : arr) {
                    if (c > 128) {
                        try {
                            String[] t = PinyinHelper.toHanyuPinyinStringArray(c, defaultFormat);
                            if (t != null) {
                                try {
                                    pybf.append(t[0].charAt(0));
                                } catch (ArrayIndexOutOfBoundsException e) {
                                    e.printStackTrace();
                                    pybf.append('x');
                                }
                            }
                        } catch (BadHanyuPinyinOutputFormatCombination e) {
                            e.printStackTrace();
                        }
                    } else {
                        pybf.append(c);
                    }
                }
                String subpy = pybf.toString().replaceAll("\\W", "").trim().substring(0, 3);
                int n = this.expertAccountDao.getExpertAccount(bulletinId).size();
                String prefix = "";
                if (n < 10) {
                    prefix = "00";
                } else if (n > 10 && n < 100) {
                    prefix = "0";
                }
                NumberFormat numberFormat = NumberFormat.getNumberInstance();
                String s = numberFormat.format(n + 1);

                StringBuilder val = new StringBuilder();
                Random random = new Random();
                for (int i = 0; i < 3; i++) {
                    String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
                    if ("char".equalsIgnoreCase(charOrNum)) {
                        int choice = random.nextInt(2) % 2 == 0 ? 65 : 97;
                        val.append((char) (choice + random.nextInt(26)));
                    } else {
                        val.append(random.nextInt(10));
                    }
                }
                username = subpy + "_" + "jmi" + "-" + prefix + (Integer.parseInt(s));
                password = subpy + "_" + "jmi" + "-" + val;
                this.expertAccountDao.addExpertAccount(bulletinId, username, password);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getExpertAccountList(bulletinId);
    }

    public List<ExpertAccount> getExpertAccountList(int bulletinId) {
        return this.expertAccountDao.getExpertAccount(bulletinId);
    }

    public List<ExpertAudit> getExpertAuditList(int declareId) {
        return this.auditDao.getExpertAuditList(declareId);
    }

    public ExpertAudit getExpertAudit(HttpServletRequest request, int declareId) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        if (state == null) {
            return null;
        }
        return this.auditDao.getExpertAudit(state.getUserid(), declareId);
    }

    public boolean setExpertAudit(HttpServletRequest request, ExpertAudit audit) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        if (state == null) {
            return false;
        }
        audit.setExpertId(state.getUserid());
        try {
            this.auditDao.setExpertAudit(audit);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}

