package dash.dao;

import java.util.List;

import dash.pojo.Activity;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface ActivityDao {

	public List<ActivityEntity> getActivity(String orderByInsertionDate);

	/**
	 * Returns a activity given its id
	 *
	 * @param id
	 * @return
	 */
	public ActivityEntity getActivityById(Long id);
	
	public void deleteActivity(Activity activity);

	public Long createActivity(ActivityEntity activity);

	public void updateActivity(ActivityEntity activity);

	/** removes all activity */
	public void deleteActivitys();	

}
