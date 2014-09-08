package dash.dao;

import java.util.List;

import dash.pojo.Application;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface ApplicationDao {

	public List<ApplicationEntity> getApplications(String orderByInsertionDate);

	/**
	 * Returns a application given its id
	 *
	 * @param id
	 * @return
	 */
	public ApplicationEntity getApplicationById(Long id);
	
	/**
	 * Find object by name
	 *
	 * @param object
	 * @return the object with the name specified or null if not existent
	 */
	public ApplicationEntity getApplicationByName(String name);

	public void deleteApplication(Application application);

	public Long createApplication(ApplicationEntity application);

	public void updateApplication(ApplicationEntity application);

	/** removes all applications */
	public void deleteApplications();	

}
