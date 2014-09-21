package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Scholarship;

public class ScholarshipDaoJPA2Impl implements ScholarshipDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<ScholarshipEntity> getScholarship(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM ScholarshipEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM ScholarshipEntity o";
		}
		TypedQuery<ScholarshipEntity> query = entityManager.createQuery(
				sqlString, ScholarshipEntity.class);

		return query.getResultList();
	}

	@Override
	public ScholarshipEntity getScholarshipById(Long id) {

		try {
			String qlString = "SELECT u FROM ScholarshipEntity u WHERE u.id = ?1";
			TypedQuery<ScholarshipEntity> query = entityManager.createQuery(
					qlString, ScholarshipEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteScholarship(Scholarship scholarshipPojo) {

		ScholarshipEntity scholarship = entityManager.find(
				ScholarshipEntity.class, scholarshipPojo.getId());
		entityManager.remove(scholarship);
	}

	@Override
	public Long createScholarship(ScholarshipEntity scholarship) {

		entityManager.persist(scholarship);
		entityManager.flush();// force insert to receive the id of the
								// scholarship

		// Give admin over new scholarship to the user
		return scholarship.getId();
	}

	@Override
	public void updateScholarship(ScholarshipEntity scholarship) {
		// TODO think about partial update and full update
		entityManager.merge(scholarship);
	}

	@Override
	public void deleteScholarships() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE scholarship");
		query.executeUpdate();
	}

}
