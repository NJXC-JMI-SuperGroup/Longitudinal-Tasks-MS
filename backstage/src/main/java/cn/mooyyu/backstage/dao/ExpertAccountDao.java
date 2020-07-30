package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.expert.ExpertAccount;
import cn.mooyyu.backstage.pojo.expert.ExpertTitle;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ExpertAccountDao {
    @Insert("insert into tb_expert(bulletinId, username, password)\n" +
            "values (#{bulletinId}, #{username}, #{password})")
    void addExpertAccount(@Param("bulletinId") int bulletinId,
                          @Param("username") String username,
                          @Param("password") String password);

    @Select("select * from tb_expert where bulletinId=#{bulletinId}")
    List<ExpertAccount> getExpertAccount(@Param("bulletinId") int bulletinId);

    @Select("select title from tb_bulletin where bulletinId=#{bulletinId}")
    String  getExpertTitle(@Param("bulletinId") int bulletinId);


}
