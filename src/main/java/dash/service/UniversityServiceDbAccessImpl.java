package dash.service;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.security.acls.model.MutableAclService;
import org.springframework.transaction.annotation.Transactional;

import dash.dao.UniversityDao;
import dash.dao.UniversityEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.University;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class UniversityServiceDbAccessImpl extends ApplicationObjectSupport implements
UniversityService {

	@Autowired
	UniversityDao universityDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<University> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createUniversity(University university) throws AppException {

		validateInputForCreation(university);

		long universityId = universityDao.createUniversity(new UniversityEntity(university));
		university.setId(universityId);
		
		aclController.createACL(university);
		aclController.createAce(university, CustomPermission.READ);
		aclController.createAce(university, CustomPermission.WRITE);
		aclController.createAce(university, CustomPermission.DELETE);
		
		return universityId;
	}

	private void validateInputForCreation(University university) throws AppException {
		if (university.getName() == null || university.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<University> getUniversity(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<UniversityEntity> universitys = universityDao.getUniversity(orderByInsertionDate);

		return getUniversityFromEntities(universitys);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public University getUniversityById(Long id) throws AppException {
		UniversityEntity universityById = universityDao.getUniversityById(id);
		if (universityById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new University(universityDao.getUniversityById(id));
	}

	private List<University> getUniversityFromEntities(List<UniversityEntity> universityEntities) {
		List<University> response = new ArrayList<University>();
		for (UniversityEntity universityEntity : universityEntities) {
			response.add(new University(universityEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyUniversity(University university) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(university)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		University verifyUniversityExistenceById = verifyUniversityExistenceById(university
				.getId());
		if (verifyUniversityExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ university.getId(),
							AppConstants.DASH_POST_URL);
		}

		universityDao.updateUniversity(new UniversityEntity(university));
	}

	/**
	 * Verifies the "completeness" of the university resource sent over the wire
	 *
	 * @param University
	 * @return
	 */
	private boolean isFullUpdate(University university) {
		return university.getId() == null
				|| university.getName() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteUniversity(University university) {

		universityDao.deleteUniversity(university);
		aclController.deleteACL(university);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Universitys to delete
	public void deleteUniversitys() {
		universityDao.deleteUniversitys();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getUniversityById(Long)
	public University verifyUniversityExistenceById(Long id) {
		UniversityEntity universityById = universityDao.getUniversityById(id);
		if (universityById == null) {
			return null;
		} else {
			return new University(universityById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyUniversity(University university) throws AppException {
		//do a validation to verify existence of the resource
		University verifyUniversityExistenceById = verifyUniversityExistenceById(university.getId());
		if (verifyUniversityExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ university.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyUniversityExistenceById, university);
		
		universityDao.updateUniversity(new UniversityEntity(verifyUniversityExistenceById));
	}

	private void copyPartialProperties(University verifyUniversityExistenceById, University university) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyUniversityExistenceById, university);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
