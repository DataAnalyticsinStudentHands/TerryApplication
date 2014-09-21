package dash.dao;

import java.util.List;

import dash.pojo.Child;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface ChildDao {

	public List<ChildEntity> getChild(String orderByInsertionDate);

	/**
	 * Returns a child given its id
	 *
	 * @param id
	 * @return
	 */
	public ChildEntity getChildById(Long id);
	
	public void deleteChild(Child child);

	public Long createChild(ChildEntity child);

	public void updateChild(ChildEntity child);

	/** removes all child */
	public void deleteChilds();	

}
