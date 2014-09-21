package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.University;

public class UniversityDaoJPA2Impl implements UniversityDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<UniversityEntity> getUniversity(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM UniversityEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM UniversityEntity o";
		}
		TypedQuery<UniversityEntity> query = entityManager.createQuery(
				sqlString, UniversityEntity.class);

		return query.getResultList();
	}

	@Override
	public UniversityEntity getUniversityById(Long id) {

		try {
			String qlString = "SELECT u FROM UniversityEntity u WHERE u.id = ?1";
			TypedQuery<UniversityEntity> query = entityManager.createQuery(
					qlString, UniversityEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteUniversity(University universityPojo) {

		UniversityEntity university = entityManager.find(
				UniversityEntity.class, universityPojo.getId());
		entityManager.remove(university);
	}

	@Override
	public Long createUniversity(UniversityEntity university) {

		entityManager.persist(university);
		entityManager.flush();// force insert to receive the id of the
								// university

		// Give admin over new university to the user
		return university.getId();
	}

	@Override
	public void updateUniversity(UniversityEntity university) {
		// TODO think about partial update and full update
		entityManager.merge(university);
	}

	@Override
	public void deleteUniversitys() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE university");
		query.executeUpdate();
	}

}
