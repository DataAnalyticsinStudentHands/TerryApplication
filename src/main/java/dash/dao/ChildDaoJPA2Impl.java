package dash.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Child;

public class ChildDaoJPA2Impl implements ChildDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<ChildEntity> getChild(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM ChildEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM ChildEntity o";
		}
		TypedQuery<ChildEntity> query = entityManager.createQuery(
				sqlString, ChildEntity.class);

		return query.getResultList();
	}

	@Override
	public ChildEntity getChildById(Long id) {

		try {
			String qlString = "SELECT u FROM ChildEntity u WHERE u.id = ?1";
			TypedQuery<ChildEntity> query = entityManager.createQuery(
					qlString, ChildEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteChild(Child childPojo) {

		ChildEntity child = entityManager.find(
				ChildEntity.class, childPojo.getId());
		entityManager.remove(child);
	}

	@Override
	public Long createChild(ChildEntity child) {

		entityManager.persist(child);
		entityManager.flush();// force insert to receive the id of the
								// child

		// Give admin over new child to the user
		return child.getId();
	}

	@Override
	public void updateChild(ChildEntity child) {
		// TODO think about partial update and full update
		entityManager.merge(child);
	}

	@Override
	public void deleteChilds() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE child");
		query.executeUpdate();
	}

}
