package dash.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.security.acls.model.MutableAclService;
import org.springframework.transaction.annotation.Transactional;

import dash.dao.ApplicationDao;
import dash.dao.ApplicationEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Application;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class ApplicationServiceDbAccessImpl extends ApplicationObjectSupport implements
ApplicationService {

	@Autowired
	ApplicationDao applicationDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Application> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createApplication(Application application) throws AppException {

		validateInputForCreation(application);

		//verify existence of resource in the db (feed must be unique)
		ApplicationEntity applicationByName = applicationDao.getApplicationByName(application.getName());
		if (applicationByName != null) {
			throw new AppException(
					Response.Status.CONFLICT.getStatusCode(),
					409,
					"Object with name already existing in the database with the id "
							+ applicationByName.getId(),
							"Please verify that the name are properly generated",
							AppConstants.DASH_POST_URL);
		}

		long applicationId = applicationDao.createApplication(new ApplicationEntity(application));
		application.setId(applicationId);
		
		aclController.createACL(application);
		aclController.createAce(application, CustomPermission.READ);
		aclController.createAce(application, CustomPermission.WRITE);
		aclController.createAce(application, CustomPermission.DELETE);
		
		return applicationId;
	}

	private void validateInputForCreation(Application application) throws AppException {
		if (application.getFirst_name() == null || application.getLast_name() == null || application.getUh_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
		//etc...
	}
	
	// save uploaded file to new location
	public boolean uploadFile(InputStream uploadedInputStream,
		String uploadedFileLocation, Application application) {
 
		try {
			File file= new File(uploadedFileLocation);
			file.getParentFile().mkdirs();
			OutputStream out = new FileOutputStream(file);
			int read = 0;
			byte[] bytes = new byte[1024];
			
			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
			return true;
		} catch (IOException e) {
 
			e.printStackTrace();
			return false;
		}
 
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Application> getApplications(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<ApplicationEntity> applictions = applicationDao.getApplications(orderByInsertionDate);

		return getApplicationsFromEntities(applictions);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Application getApplicationById(Long id) throws AppException {
		ApplicationEntity applicationById = applicationDao.getApplicationById(id);
		if (applicationById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Application(applicationDao.getApplicationById(id));
	}

	private List<Application> getApplicationsFromEntities(List<ApplicationEntity> applicationEntities) {
		List<Application> response = new ArrayList<Application>();
		for (ApplicationEntity applicationEntity : applicationEntities) {
			response.add(new Application(applicationEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyApplication(Application application) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(application)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Application verifyApplicationExistenceById = verifyApplicationExistenceById(application
				.getId());
		if (verifyApplicationExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ application.getId(),
							AppConstants.DASH_POST_URL);
		}

		applicationDao.updateApplication(new ApplicationEntity(application));
	}

	/**
	 * Verifies the "completeness" of the application resource sent over the wire
	 *
	 * @param Application
	 * @return
	 */
	private boolean isFullUpdate(Application application) {
		return application.getId() == null
				|| application.getName() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteApplication(Application application) {

		applicationDao.deleteApplication(application);
		aclController.deleteACL(application);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// applications to delete
	public void deleteApplications() {
		applicationDao.deleteApplications();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getApplicationById(Long)
	public Application verifyApplicationExistenceById(Long id) {
		ApplicationEntity applicationById = applicationDao.getApplicationById(id);
		if (applicationById == null) {
			return null;
		} else {
			return new Application(applicationById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyApplication(Application application) throws AppException {
		//do a validation to verify existence of the resource
		Application verifyApplicationExistenceById = verifyApplicationExistenceById(application.getId());
		if (verifyApplicationExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ application.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyApplicationExistenceById, application);
		
		applicationDao.updateApplication(new ApplicationEntity(verifyApplicationExistenceById));
		
		

	}

	private void copyPartialProperties(Application verifyApplicationExistenceById, Application application) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyApplicationExistenceById, application);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
