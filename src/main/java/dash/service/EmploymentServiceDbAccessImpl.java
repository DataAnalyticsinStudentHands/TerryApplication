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

import dash.dao.EmploymentDao;
import dash.dao.EmploymentEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Employment;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class EmploymentServiceDbAccessImpl extends ApplicationObjectSupport implements
EmploymentService {

	@Autowired
	EmploymentDao employmentDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Employment> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createEmployment(Employment employment) throws AppException {

		validateInputForCreation(employment);

		long employmentId = employmentDao.createEmployment(new EmploymentEntity(employment));
		employment.setId(employmentId);
		
		aclController.createACL(employment);
		aclController.createAce(employment, CustomPermission.READ);
		aclController.createAce(employment, CustomPermission.WRITE);
		aclController.createAce(employment, CustomPermission.DELETE);
		
		return employmentId;
	}

	private void validateInputForCreation(Employment employment) throws AppException {
		if (employment.getPosition() == null || employment.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Employment> getEmployment(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<EmploymentEntity> employments = employmentDao.getEmployment(orderByInsertionDate);

		return getEmploymentFromEntities(employments);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Employment getEmploymentById(Long id) throws AppException {
		EmploymentEntity employmentById = employmentDao.getEmploymentById(id);
		if (employmentById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Employment(employmentDao.getEmploymentById(id));
	}

	private List<Employment> getEmploymentFromEntities(List<EmploymentEntity> employmentEntities) {
		List<Employment> response = new ArrayList<Employment>();
		for (EmploymentEntity employmentEntity : employmentEntities) {
			response.add(new Employment(employmentEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyEmployment(Employment employment) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(employment)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Employment verifyEmploymentExistenceById = verifyEmploymentExistenceById(employment
				.getId());
		if (verifyEmploymentExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ employment.getId(),
							AppConstants.DASH_POST_URL);
		}

		employmentDao.updateEmployment(new EmploymentEntity(employment));
	}

	/**
	 * Verifies the "completeness" of the employment resource sent over the wire
	 *
	 * @param Employment
	 * @return
	 */
	private boolean isFullUpdate(Employment employment) {
		return employment.getId() == null
				|| employment.getPosition() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteEmployment(Employment employment) {

		employmentDao.deleteEmployment(employment);
		aclController.deleteACL(employment);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Employments to delete
	public void deleteEmployments() {
		employmentDao.deleteEmployments();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getEmploymentById(Long)
	public Employment verifyEmploymentExistenceById(Long id) {
		EmploymentEntity employmentById = employmentDao.getEmploymentById(id);
		if (employmentById == null) {
			return null;
		} else {
			return new Employment(employmentById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyEmployment(Employment employment) throws AppException {
		//do a validation to verify existence of the resource
		Employment verifyEmploymentExistenceById = verifyEmploymentExistenceById(employment.getId());
		if (verifyEmploymentExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ employment.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyEmploymentExistenceById, employment);
		
		employmentDao.updateEmployment(new EmploymentEntity(verifyEmploymentExistenceById));
	}

	private void copyPartialProperties(Employment verifyEmploymentExistenceById, Employment employment) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyEmploymentExistenceById, employment);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
