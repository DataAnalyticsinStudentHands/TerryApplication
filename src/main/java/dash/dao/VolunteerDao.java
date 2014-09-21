package dash.dao;

import java.util.List;

import dash.pojo.Volunteer;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface VolunteerDao {

	public List<VolunteerEntity> getVolunteer(String orderByInsertionDate);

	/**
	 * Returns a volunteer given its id
	 *
	 * @param id
	 * @return
	 */
	public VolunteerEntity getVolunteerById(Long id);
	
	public void deleteVolunteer(Volunteer volunteer);

	public Long createVolunteer(VolunteerEntity volunteer);

	public void updateVolunteer(VolunteerEntity volunteer);

	/** removes all volunteer */
	public void deleteVolunteers();	

}
