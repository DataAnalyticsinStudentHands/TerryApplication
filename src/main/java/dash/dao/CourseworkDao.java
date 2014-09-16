package dash.dao;

import java.util.List;

import dash.pojo.Coursework;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface CourseworkDao {

	public List<CourseworkEntity> getCoursework(String orderByInsertionDate);

	/**
	 * Returns a coursework given its id
	 *
	 * @param id
	 * @return
	 */
	public CourseworkEntity getCourseworkById(Long id);
	
	public void deleteCoursework(Coursework coursework);

	public Long createCoursework(CourseworkEntity coursework);

	public void updateCoursework(CourseworkEntity coursework);

	/** removes all coursework */
	public void deleteCourseworks();	

}
