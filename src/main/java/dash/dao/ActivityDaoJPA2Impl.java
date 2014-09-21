package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Activity;

public class ActivityDaoJPA2Impl implements ActivityDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<ActivityEntity> getActivity(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM ActivityEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM ActivityEntity o";
		}
		TypedQuery<ActivityEntity> query = entityManager.createQuery(
				sqlString, ActivityEntity.class);

		return query.getResultList();
	}

	@Override
	public ActivityEntity getActivityById(Long id) {

		try {
			String qlString = "SELECT u FROM ActivityEntity u WHERE u.id = ?1";
			TypedQuery<ActivityEntity> query = entityManager.createQuery(
					qlString, ActivityEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteActivity(Activity activityPojo) {

		ActivityEntity activity = entityManager.find(
				ActivityEntity.class, activityPojo.getId());
		entityManager.remove(activity);
	}

	@Override
	public Long createActivity(ActivityEntity activity) {

		entityManager.persist(activity);
		entityManager.flush();// force insert to receive the id of the
								// activity

		// Give admin over new activity to the user
		return activity.getId();
	}

	@Override
	public void updateActivity(ActivityEntity activity) {
		// TODO think about partial update and full update
		entityManager.merge(activity);
	}

	@Override
	public void deleteActivitys() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE activity");
		query.executeUpdate();
	}

}
