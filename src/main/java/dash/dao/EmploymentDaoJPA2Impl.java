package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Employment;

public class EmploymentDaoJPA2Impl implements EmploymentDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<EmploymentEntity> getEmployment(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM EmploymentEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM EmploymentEntity o";
		}
		TypedQuery<EmploymentEntity> query = entityManager.createQuery(
				sqlString, EmploymentEntity.class);

		return query.getResultList();
	}

	@Override
	public EmploymentEntity getEmploymentById(Long id) {

		try {
			String qlString = "SELECT u FROM EmploymentEntity u WHERE u.id = ?1";
			TypedQuery<EmploymentEntity> query = entityManager.createQuery(
					qlString, EmploymentEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteEmployment(Employment employmentPojo) {

		EmploymentEntity employment = entityManager.find(
				EmploymentEntity.class, employmentPojo.getId());
		entityManager.remove(employment);
	}

	@Override
	public Long createEmployment(EmploymentEntity employment) {

		entityManager.persist(employment);
		entityManager.flush();// force insert to receive the id of the
								// employment

		// Give admin over new employment to the user
		return employment.getId();
	}

	@Override
	public void updateEmployment(EmploymentEntity employment) {
		// TODO think about partial update and full update
		entityManager.merge(employment);
	}

	@Override
	public void deleteEmployments() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE employment");
		query.executeUpdate();
	}

}
