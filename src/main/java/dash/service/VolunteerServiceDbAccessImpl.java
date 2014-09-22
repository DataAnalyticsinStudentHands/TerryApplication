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

import dash.dao.VolunteerDao;
import dash.dao.VolunteerEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Volunteer;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class VolunteerServiceDbAccessImpl extends ApplicationObjectSupport implements
VolunteerService {

	@Autowired
	VolunteerDao volunteerDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Volunteer> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createVolunteer(Volunteer volunteer) throws AppException {

		validateInputForCreation(volunteer);

		long volunteerId = volunteerDao.createVolunteer(new VolunteerEntity(volunteer));
		volunteer.setId(volunteerId);
		
		aclController.createACL(volunteer);
		aclController.createAce(volunteer, CustomPermission.READ);
		aclController.createAce(volunteer, CustomPermission.WRITE);
		aclController.createAce(volunteer, CustomPermission.DELETE);
		
		return volunteerId;
	}

	private void validateInputForCreation(Volunteer volunteer) throws AppException {
		if (volunteer.getPlace() == null || volunteer.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Volunteer> getVolunteer(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<VolunteerEntity> volunteers = volunteerDao.getVolunteer(orderByInsertionDate);

		return getVolunteerFromEntities(volunteers);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Volunteer getVolunteerById(Long id) throws AppException {
		VolunteerEntity volunteerById = volunteerDao.getVolunteerById(id);
		if (volunteerById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Volunteer(volunteerDao.getVolunteerById(id));
	}

	private List<Volunteer> getVolunteerFromEntities(List<VolunteerEntity> volunteerEntities) {
		List<Volunteer> response = new ArrayList<Volunteer>();
		for (VolunteerEntity volunteerEntity : volunteerEntities) {
			response.add(new Volunteer(volunteerEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyVolunteer(Volunteer volunteer) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(volunteer)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Volunteer verifyVolunteerExistenceById = verifyVolunteerExistenceById(volunteer
				.getId());
		if (verifyVolunteerExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ volunteer.getId(),
							AppConstants.DASH_POST_URL);
		}

		volunteerDao.updateVolunteer(new VolunteerEntity(volunteer));
	}

	/**
	 * Verifies the "completeness" of the volunteer resource sent over the wire
	 *
	 * @param Volunteer
	 * @return
	 */
	private boolean isFullUpdate(Volunteer volunteer) {
		return volunteer.getId() == null
				|| volunteer.getPlace() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteVolunteer(Volunteer volunteer) {

		volunteerDao.deleteVolunteer(volunteer);
		aclController.deleteACL(volunteer);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Volunteers to delete
	public void deleteVolunteers() {
		volunteerDao.deleteVolunteers();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getVolunteerById(Long)
	public Volunteer verifyVolunteerExistenceById(Long id) {
		VolunteerEntity volunteerById = volunteerDao.getVolunteerById(id);
		if (volunteerById == null) {
			return null;
		} else {
			return new Volunteer(volunteerById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyVolunteer(Volunteer volunteer) throws AppException {
		//do a validation to verify existence of the resource
		Volunteer verifyVolunteerExistenceById = verifyVolunteerExistenceById(volunteer.getId());
		if (verifyVolunteerExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ volunteer.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyVolunteerExistenceById, volunteer);
		
		volunteerDao.updateVolunteer(new VolunteerEntity(verifyVolunteerExistenceById));
	}

	private void copyPartialProperties(Volunteer verifyVolunteerExistenceById, Volunteer volunteer) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyVolunteerExistenceById, volunteer);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
