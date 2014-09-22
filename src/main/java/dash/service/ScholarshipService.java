package dash.service;

import java.util.List;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

import dash.errorhandling.AppException;
import dash.pojo.Scholarship;

public interface ScholarshipService {
	/*
	 * ******************** Create related methods **********************
	 *
	 *Create a new image and set the current user as owner and manager.
	 */
	public Long createScholarship(Scholarship scholarship) throws AppException;	

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
	public List<Scholarship> getScholarship(String orderByInsertionDate) throws AppException;

	/**
	 * Returns scholarship given its id
	 *
	 * @param id
	 * @return
	 * @throws AppException
	 */
	@PostAuthorize("hasPermission(returnObject, 'READ') or hasRole('ROLE_ADMIN')")
	public Scholarship getScholarshipById(Long id) throws AppException;
	
	/*
	 * ******************** Update related methods **********************
	 */
	@PreAuthorize("hasPermission(#scholarship, 'WRITE') or hasRole('ROLE_ADMIN')")
	public void updateFullyScholarship(Scholarship application) throws AppException;

	@PreAuthorize("hasPermission(#scholarship, 'WRITE') or hasRole('ROLE_ADMIN')")
	public void updatePartiallyScholarship(Scholarship application) throws AppException;
	
	/*
	 * ******************** Delete related methods **********************
	 */
	@PreAuthorize("hasPermission(#scholarship, 'delete') or hasRole('ROLE_ADMIN')")
	public void deleteScholarship(Scholarship scholarship);
	
	/** removes all applications
	 * DO NOT USE, IMPROPERLY UPDATES ACL_OBJECT table
	 * Functional but does not destroy old acl's which doesnt hurt anything
	 * but they will take up space if this is commonly used */
	@PreAuthorize("hasRole('ROLE_ROOT')")
	public void deleteScholarships();	

	/*
	 * ******************** Helper methods **********************
	 */
	// TODO: This also should not exist, or it should be changed to
	// private/protected. Redundant
	// Could be made a boolean so it was not a security vulnerability
	public Scholarship verifyScholarshipExistenceById(Long id);	

}
