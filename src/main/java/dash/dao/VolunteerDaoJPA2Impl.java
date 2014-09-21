package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Volunteer;

public class VolunteerDaoJPA2Impl implements VolunteerDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<VolunteerEntity> getVolunteer(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM VolunteerEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM VolunteerEntity o";
		}
		TypedQuery<VolunteerEntity> query = entityManager.createQuery(
				sqlString, VolunteerEntity.class);

		return query.getResultList();
	}

	@Override
	public VolunteerEntity getVolunteerById(Long id) {

		try {
			String qlString = "SELECT u FROM VolunteerEntity u WHERE u.id = ?1";
			TypedQuery<VolunteerEntity> query = entityManager.createQuery(
					qlString, VolunteerEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteVolunteer(Volunteer volunteerPojo) {

		VolunteerEntity volunteer = entityManager.find(
				VolunteerEntity.class, volunteerPojo.getId());
		entityManager.remove(volunteer);
	}

	@Override
	public Long createVolunteer(VolunteerEntity volunteer) {

		entityManager.persist(volunteer);
		entityManager.flush();// force insert to receive the id of the
								// volunteer

		// Give admin over new volunteer to the user
		return volunteer.getId();
	}

	@Override
	public void updateVolunteer(VolunteerEntity volunteer) {
		// TODO think about partial update and full update
		entityManager.merge(volunteer);
	}

	@Override
	public void deleteVolunteers() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE volunteer");
		query.executeUpdate();
	}

}
