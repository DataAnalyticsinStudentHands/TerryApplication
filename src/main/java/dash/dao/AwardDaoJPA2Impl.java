package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Award;

public class AwardDaoJPA2Impl implements AwardDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<AwardEntity> getAward(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM AwardEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM AwardEntity o";
		}
		TypedQuery<AwardEntity> query = entityManager.createQuery(
				sqlString, AwardEntity.class);

		return query.getResultList();
	}

	@Override
	public AwardEntity getAwardById(Long id) {

		try {
			String qlString = "SELECT u FROM AwardEntity u WHERE u.id = ?1";
			TypedQuery<AwardEntity> query = entityManager.createQuery(
					qlString, AwardEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteAward(Award awardPojo) {

		AwardEntity award = entityManager.find(
				AwardEntity.class, awardPojo.getId());
		entityManager.remove(award);
	}

	@Override
	public Long createAward(AwardEntity award) {

		entityManager.persist(award);
		entityManager.flush();// force insert to receive the id of the
								// award

		// Give admin over new award to the user
		return award.getId();
	}

	@Override
	public void updateAward(AwardEntity award) {
		// TODO think about partial update and full update
		entityManager.merge(award);
	}

	@Override
	public void deleteAwards() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE award");
		query.executeUpdate();
	}

}
