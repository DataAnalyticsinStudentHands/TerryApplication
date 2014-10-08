package dash.service;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import javax.ws.rs.core.Response;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

import dash.errorhandling.AppException;
import dash.pojo.Application;

public interface ApplicationService {
	/*
	 * ******************** Create related methods **********************
	 *
	 *Create a new image and set the current user as owner and manager.
	 */
	public Long createApplication(Application application) throws AppException;	

	@PreAuthorize("hasPermission(#application, 'write') or hasRole('ROLE_ADMIN')")
	public void uploadFile(InputStream uploadedInputStream,
			String uploadedFileLocation, Application application) throws AppException;
	
	/*
	 * ******************* Read related methods ********************
	 */
	/**
	 *
	 * @param orderByInsertionDate
	 *            - if set, it represents the order by criteria (ASC or DESC)
	 *            for displaying objects
	 * @return list with objects corresponding to search criteria
	 * @throws AppException
	 */
	@PostFilter("hasPermission(filterObject, 'READ') or hasRole('ROLE_ADMIN')")
	public List<Application> getApplications(String orderByInsertionDate) throws AppException;

	/**
	 * Returns a application given its id
	 *
	 * @param id
	 * @return
	 * @throws AppException
	 */
	@PostAuthorize("hasPermission(returnObject, 'READ') or hasRole('ROLE_ADMIN')")
	public Application getApplicationById(Long id) throws AppException;
	
	@PreAuthorize("hasPermission(#application, 'read') or hasRole('ROLE_ADMIN')")
	public File getUploadFile(String uploadedFileLocation, Application application) throws AppException;
	
	/*
	 * ******************** Update related methods **********************
	 */
	@PreAuthorize("hasPermission(#application, 'WRITE') or hasRole('ROLE_ADMIN')")
	public void updateFullyApplication(Application application) throws AppException;

	@PreAuthorize("hasPermission(#application, 'WRITE') or hasRole('ROLE_ADMIN')")
	public void updatePartiallyApplication(Application application) throws AppException;
	
	/*
	 * ******************** Delete related methods **********************
	 */
	@PreAuthorize("hasPermission(#application, 'delete') or hasRole('ROLE_ADMIN')")
	public void deleteApplication(Application application);
	
	/** removes all applications
	 * DO NOT USE, IMPROPERLY UPDATES ACL_OBJECT table
	 * Functional but does not destroy old acl's which doesnt hurt anything
	 * but they will take up space if this is commonly used */
	@PreAuthorize("hasRole('ROLE_ROOT')")
	public void deleteApplications();	

	
	@PreAuthorize("hasPermission(#application, 'delete') or hasRole('ROLE_ADMIN')")
	public void deleteUploadFile(String uploadedFileLocation, Application application) throws AppException;
	/*
	 * ******************** Helper methods **********************
	 */
	// TODO: This also should not exist, or it should be changed to
	// private/protected. Redundant
	// Could be made a boolean so it was not a security vulnerability
	public Application verifyApplicationExistenceById(Long id);
	
	@PreAuthorize("hasPermission(#application, 'read') or hasRole('ROLE_ADMIN')")
	public List<String> getFileNames(Application application);	

}
