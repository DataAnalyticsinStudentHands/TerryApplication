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

import dash.dao.ActivityDao;
import dash.dao.ActivityEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Activity;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class ActivityServiceDbAccessImpl extends ApplicationObjectSupport implements
ActivityService {

	@Autowired
	ActivityDao activityDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Activity> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createActivity(Activity activity) throws AppException {

		validateInputForCreation(activity);

		long activityId = activityDao.createActivity(new ActivityEntity(activity));
		activity.setId(activityId);
		
		aclController.createACL(activity);
		aclController.createAce(activity, CustomPermission.READ);
		aclController.createAce(activity, CustomPermission.WRITE);
		aclController.createAce(activity, CustomPermission.DELETE);
		
		return activityId;
	}

	private void validateInputForCreation(Activity activity) throws AppException {
		if (activity.getActivity() == null || activity.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Activity> getActivity(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<ActivityEntity> activitys = activityDao.getActivity(orderByInsertionDate);

		return getActivityFromEntities(activitys);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Activity getActivityById(Long id) throws AppException {
		ActivityEntity activityById = activityDao.getActivityById(id);
		if (activityById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Activity(activityDao.getActivityById(id));
	}

	private List<Activity> getActivityFromEntities(List<ActivityEntity> activityEntities) {
		List<Activity> response = new ArrayList<Activity>();
		for (ActivityEntity activityEntity : activityEntities) {
			response.add(new Activity(activityEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyActivity(Activity activity) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(activity)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Activity verifyActivityExistenceById = verifyActivityExistenceById(activity
				.getId());
		if (verifyActivityExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ activity.getId(),
							AppConstants.DASH_POST_URL);
		}

		activityDao.updateActivity(new ActivityEntity(activity));
	}

	/**
	 * Verifies the "completeness" of the activity resource sent over the wire
	 *
	 * @param Activity
	 * @return
	 */
	private boolean isFullUpdate(Activity activity) {
		return activity.getId() == null
				|| activity.getActivity() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteActivity(Activity activity) {

		activityDao.deleteActivity(activity);
		aclController.deleteACL(activity);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Activitys to delete
	public void deleteActivitys() {
		activityDao.deleteActivitys();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getActivityById(Long)
	public Activity verifyActivityExistenceById(Long id) {
		ActivityEntity activityById = activityDao.getActivityById(id);
		if (activityById == null) {
			return null;
		} else {
			return new Activity(activityById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyActivity(Activity activity) throws AppException {
		//do a validation to verify existence of the resource
		Activity verifyActivityExistenceById = verifyActivityExistenceById(activity.getId());
		if (verifyActivityExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ activity.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyActivityExistenceById, activity);
		
		activityDao.updateActivity(new ActivityEntity(verifyActivityExistenceById));
	}

	private void copyPartialProperties(Activity verifyActivityExistenceById, Activity activity) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyActivityExistenceById, activity);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
