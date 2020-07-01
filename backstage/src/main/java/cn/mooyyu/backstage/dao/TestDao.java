package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.Message;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TestDao {
    @Select("select * from only_text where card = #{card}")
    Message findMessageByCard(@Param("card") int card);
}
