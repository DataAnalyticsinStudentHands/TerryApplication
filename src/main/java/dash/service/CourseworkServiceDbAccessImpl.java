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

import dash.dao.CourseworkDao;
import dash.dao.CourseworkEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Coursework;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class CourseworkServiceDbAccessImpl extends ApplicationObjectSupport implements
CourseworkService {

	@Autowired
	CourseworkDao courseworkDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Coursework> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createCoursework(Coursework coursework) throws AppException {

		validateInputForCreation(coursework);

		long courseworkId = courseworkDao.createCoursework(new CourseworkEntity(coursework));
		coursework.setId(courseworkId);
		
		aclController.createACL(coursework);
		aclController.createAce(coursework, CustomPermission.READ);
		aclController.createAce(coursework, CustomPermission.WRITE);
		aclController.createAce(coursework, CustomPermission.DELETE);
		
		return courseworkId;
	}

	private void validateInputForCreation(Coursework coursework) throws AppException {
		if (coursework.getName() == null || coursework.getType() == null || coursework.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Coursework> getCoursework(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<CourseworkEntity> courseworks = courseworkDao.getCoursework(orderByInsertionDate);

		return getCourseworkFromEntities(courseworks);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Coursework getCourseworkById(Long id) throws AppException {
		CourseworkEntity courseworkById = courseworkDao.getCourseworkById(id);
		if (courseworkById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Coursework(courseworkDao.getCourseworkById(id));
	}

	private List<Coursework> getCourseworkFromEntities(List<CourseworkEntity> courseworkEntities) {
		List<Coursework> response = new ArrayList<Coursework>();
		for (CourseworkEntity courseworkEntity : courseworkEntities) {
			response.add(new Coursework(courseworkEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyCoursework(Coursework coursework) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(coursework)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Coursework verifyCourseworkExistenceById = verifyCourseworkExistenceById(coursework
				.getId());
		if (verifyCourseworkExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ coursework.getId(),
							AppConstants.DASH_POST_URL);
		}

		courseworkDao.updateCoursework(new CourseworkEntity(coursework));
	}

	/**
	 * Verifies the "completeness" of the coursework resource sent over the wire
	 *
	 * @param Coursework
	 * @return
	 */
	private boolean isFullUpdate(Coursework coursework) {
		return coursework.getId() == null
				|| coursework.getName() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteCoursework(Coursework coursework) {

		courseworkDao.deleteCoursework(coursework);
		aclController.deleteACL(coursework);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Courseworks to delete
	public void deleteCourseworks() {
		courseworkDao.deleteCourseworks();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getCourseworkById(Long)
	public Coursework verifyCourseworkExistenceById(Long id) {
		CourseworkEntity courseworkById = courseworkDao.getCourseworkById(id);
		if (courseworkById == null) {
			return null;
		} else {
			return new Coursework(courseworkById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyCoursework(Coursework coursework) throws AppException {
		//do a validation to verify existence of the resource
		Coursework verifyCourseworkExistenceById = verifyCourseworkExistenceById(coursework.getId());
		if (verifyCourseworkExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ coursework.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyCourseworkExistenceById, coursework);
		
		courseworkDao.updateCoursework(new CourseworkEntity(verifyCourseworkExistenceById));
	}

	private void copyPartialProperties(Coursework verifyCourseworkExistenceById, Coursework coursework) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyCourseworkExistenceById, coursework);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
