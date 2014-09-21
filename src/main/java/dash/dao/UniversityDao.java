package dash.dao;

import java.util.List;

import dash.pojo.University;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface UniversityDao {

	public List<UniversityEntity> getUniversity(String orderByInsertionDate);

	/**
	 * Returns a university given its id
	 *
	 * @param id
	 * @return
	 */
	public UniversityEntity getUniversityById(Long id);
	
	public void deleteUniversity(University university);

	public Long createUniversity(UniversityEntity university);

	public void updateUniversity(UniversityEntity university);

	/** removes all university */
	public void deleteUniversitys();	

}
