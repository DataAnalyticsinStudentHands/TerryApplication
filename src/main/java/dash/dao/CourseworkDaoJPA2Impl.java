package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Coursework;

public class CourseworkDaoJPA2Impl implements CourseworkDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<CourseworkEntity> getCoursework(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM CourseworkEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM CourseworkEntity o";
		}
		TypedQuery<CourseworkEntity> query = entityManager.createQuery(
				sqlString, CourseworkEntity.class);

		return query.getResultList();
	}

	@Override
	public CourseworkEntity getCourseworkById(Long id) {

		try {
			String qlString = "SELECT u FROM CourseworkEntity u WHERE u.id = ?1";
			TypedQuery<CourseworkEntity> query = entityManager.createQuery(
					qlString, CourseworkEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteCoursework(Coursework courseworkPojo) {

		CourseworkEntity coursework = entityManager.find(
				CourseworkEntity.class, courseworkPojo.getId());
		entityManager.remove(coursework);
	}

	@Override
	public Long createCoursework(CourseworkEntity coursework) {

		entityManager.persist(coursework);
		entityManager.flush();// force insert to receive the id of the
								// coursework

		// Give admin over new coursework to the user
		return coursework.getId();
	}

	@Override
	public void updateCoursework(CourseworkEntity coursework) {
		// TODO think about partial update and full update
		entityManager.merge(coursework);
	}

	@Override
	public void deleteCourseworks() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE coursework");
		query.executeUpdate();
	}

}
