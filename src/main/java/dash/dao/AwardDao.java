package dash.dao;

import java.util.List;

import dash.pojo.Award;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface AwardDao {

	public List<AwardEntity> getAward(String orderByInsertionDate);

	/**
	 * Returns a award given its id
	 *
	 * @param id
	 * @return
	 */
	public AwardEntity getAwardById(Long id);
	
	public void deleteAward(Award award);

	public Long createAward(AwardEntity award);

	public void updateAward(AwardEntity award);

	/** removes all award */
	public void deleteAwards();	

}
