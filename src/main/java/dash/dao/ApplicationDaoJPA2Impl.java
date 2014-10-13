package dash.dao;

import java.io.File;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import dash.pojo.Application;

public class ApplicationDaoJPA2Impl implements ApplicationDao {

	@PersistenceContext(unitName = "dashPersistence")
	private EntityManager entityManager;

	@Override
	public List<ApplicationEntity> getApplications(String orderByInsertionDate) {
		String sqlString = null;
		if (orderByInsertionDate != null) {
			sqlString = "SELECT o FROM ApplicationEntity o"
					+ " ORDER BY o.insertionDate " + orderByInsertionDate;
		} else {
			sqlString = "SELECT o FROM ApplicationEntity o";
		}
		TypedQuery<ApplicationEntity> query = entityManager.createQuery(
				sqlString, ApplicationEntity.class);

		return query.getResultList();
	}

	@Override
	public ApplicationEntity getApplicationById(Long id) {

		try {
			String qlString = "SELECT u FROM ApplicationEntity u WHERE u.id = ?1";
			TypedQuery<ApplicationEntity> query = entityManager.createQuery(
					qlString, ApplicationEntity.class);
			query.setParameter(1, id);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public ApplicationEntity getApplicationByName(String name) {

		try {
			String qlString = "SELECT o FROM ApplicationEntity o WHERE o.name = ?1";
			TypedQuery<ApplicationEntity> query = entityManager.createQuery(
					qlString, ApplicationEntity.class);
			query.setParameter(1, name);

			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public void deleteApplication(Application applicationPojo) {

		ApplicationEntity application = entityManager.find(
				ApplicationEntity.class, applicationPojo.getId());
		entityManager.remove(application);
	}

	@Override
	public Long createApplication(ApplicationEntity application) {

		application.setCreation_timestamp(new Date());
		application.setStatus("in progress");
		
		entityManager.persist(application);
		entityManager.flush();// force insert to receive the id of the
								// application
		// create hashed folder name for documents
		String fileName = application.getId().toString();
		int hashcode = fileName.hashCode();
		int mask = 255;
		int firstDir = hashcode & mask;
		int secondDir = (hashcode >> 8) & mask;
		StringBuilder path = new StringBuilder(File.separator);
		path.append(String.format("%03d", firstDir));
		path.append(File.separator);
		path.append(String.format("%03d", secondDir));
		path.append(File.separator);
		path.append(fileName);
		application.setDocument_folder(path.toString());
		entityManager.merge(application);
	
		// Give admin over new application to the new user
		return application.getId();
	}
		

	@Override
	public void updateApplication(ApplicationEntity application) {
		// TODO think about partial update and full update
		entityManager.merge(application);
	}

	@Override
	public void deleteApplications() {
		Query query = entityManager
				.createNativeQuery("TRUNCATE TABLE applications");
		query.executeUpdate();
	}

}
