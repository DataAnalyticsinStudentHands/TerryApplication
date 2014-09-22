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

import dash.dao.ChildDao;
import dash.dao.ChildEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Child;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class ChildServiceDbAccessImpl extends ApplicationObjectSupport implements
ChildService {

	@Autowired
	ChildDao childDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Child> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createChild(Child child) throws AppException {

		validateInputForCreation(child);

		long childId = childDao.createChild(new ChildEntity(child));
		child.setId(childId);
		
		aclController.createACL(child);
		aclController.createAce(child, CustomPermission.READ);
		aclController.createAce(child, CustomPermission.WRITE);
		aclController.createAce(child, CustomPermission.DELETE);
		
		return childId;
	}

	private void validateInputForCreation(Child child) throws AppException {
		if (child.getName() == null || child.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Child> getChild(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<ChildEntity> childs = childDao.getChild(orderByInsertionDate);

		return getChildFromEntities(childs);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Child getChildById(Long id) throws AppException {
		ChildEntity childById = childDao.getChildById(id);
		if (childById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Child(childDao.getChildById(id));
	}

	private List<Child> getChildFromEntities(List<ChildEntity> childEntities) {
		List<Child> response = new ArrayList<Child>();
		for (ChildEntity childEntity : childEntities) {
			response.add(new Child(childEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyChild(Child child) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(child)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Child verifyChildExistenceById = verifyChildExistenceById(child
				.getId());
		if (verifyChildExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ child.getId(),
							AppConstants.DASH_POST_URL);
		}

		childDao.updateChild(new ChildEntity(child));
	}

	/**
	 * Verifies the "completeness" of the child resource sent over the wire
	 *
	 * @param Child
	 * @return
	 */
	private boolean isFullUpdate(Child child) {
		return child.getId() == null
				|| child.getName() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteChild(Child child) {

		childDao.deleteChild(child);
		aclController.deleteACL(child);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Childs to delete
	public void deleteChilds() {
		childDao.deleteChilds();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getChildById(Long)
	public Child verifyChildExistenceById(Long id) {
		ChildEntity childById = childDao.getChildById(id);
		if (childById == null) {
			return null;
		} else {
			return new Child(childById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyChild(Child child) throws AppException {
		//do a validation to verify existence of the resource
		Child verifyChildExistenceById = verifyChildExistenceById(child.getId());
		if (verifyChildExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ child.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyChildExistenceById, child);
		
		childDao.updateChild(new ChildEntity(verifyChildExistenceById));
	}

	private void copyPartialProperties(Child verifyChildExistenceById, Child child) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyChildExistenceById, child);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
