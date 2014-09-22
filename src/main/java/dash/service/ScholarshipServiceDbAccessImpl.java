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

import dash.dao.ScholarshipDao;
import dash.dao.ScholarshipEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Scholarship;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class ScholarshipServiceDbAccessImpl extends ApplicationObjectSupport implements
ScholarshipService {

	@Autowired
	ScholarshipDao scholarshipDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Scholarship> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createScholarship(Scholarship scholarship) throws AppException {

		validateInputForCreation(scholarship);

		long scholarshipId = scholarshipDao.createScholarship(new ScholarshipEntity(scholarship));
		scholarship.setId(scholarshipId);
		
		aclController.createACL(scholarship);
		aclController.createAce(scholarship, CustomPermission.READ);
		aclController.createAce(scholarship, CustomPermission.WRITE);
		aclController.createAce(scholarship, CustomPermission.DELETE);
		
		return scholarshipId;
	}

	private void validateInputForCreation(Scholarship scholarship) throws AppException {
		if (scholarship.getName() == null || scholarship.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Scholarship> getScholarship(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<ScholarshipEntity> scholarships = scholarshipDao.getScholarship(orderByInsertionDate);

		return getScholarshipFromEntities(scholarships);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Scholarship getScholarshipById(Long id) throws AppException {
		ScholarshipEntity scholarshipById = scholarshipDao.getScholarshipById(id);
		if (scholarshipById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Scholarship(scholarshipDao.getScholarshipById(id));
	}

	private List<Scholarship> getScholarshipFromEntities(List<ScholarshipEntity> scholarshipEntities) {
		List<Scholarship> response = new ArrayList<Scholarship>();
		for (ScholarshipEntity scholarshipEntity : scholarshipEntities) {
			response.add(new Scholarship(scholarshipEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyScholarship(Scholarship scholarship) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(scholarship)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Scholarship verifyScholarshipExistenceById = verifyScholarshipExistenceById(scholarship
				.getId());
		if (verifyScholarshipExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ scholarship.getId(),
							AppConstants.DASH_POST_URL);
		}

		scholarshipDao.updateScholarship(new ScholarshipEntity(scholarship));
	}

	/**
	 * Verifies the "completeness" of the scholarship resource sent over the wire
	 *
	 * @param Scholarship
	 * @return
	 */
	private boolean isFullUpdate(Scholarship scholarship) {
		return scholarship.getId() == null
				|| scholarship.getName() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteScholarship(Scholarship scholarship) {

		scholarshipDao.deleteScholarship(scholarship);
		aclController.deleteACL(scholarship);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Scholarships to delete
	public void deleteScholarships() {
		scholarshipDao.deleteScholarships();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getScholarshipById(Long)
	public Scholarship verifyScholarshipExistenceById(Long id) {
		ScholarshipEntity scholarshipById = scholarshipDao.getScholarshipById(id);
		if (scholarshipById == null) {
			return null;
		} else {
			return new Scholarship(scholarshipById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyScholarship(Scholarship scholarship) throws AppException {
		//do a validation to verify existence of the resource
		Scholarship verifyScholarshipExistenceById = verifyScholarshipExistenceById(scholarship.getId());
		if (verifyScholarshipExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ scholarship.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyScholarshipExistenceById, scholarship);
		
		scholarshipDao.updateScholarship(new ScholarshipEntity(verifyScholarshipExistenceById));
	}

	private void copyPartialProperties(Scholarship verifyScholarshipExistenceById, Scholarship scholarship) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyScholarshipExistenceById, scholarship);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
