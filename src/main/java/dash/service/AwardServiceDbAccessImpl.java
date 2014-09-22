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

import dash.dao.AwardDao;
import dash.dao.AwardEntity;
import dash.errorhandling.AppException;
import dash.filters.AppConstants;
import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Award;
import dash.security.CustomPermission;
import dash.security.GenericAclController;

public class AwardServiceDbAccessImpl extends ApplicationObjectSupport implements
AwardService {

	@Autowired
	AwardDao awardDao;

	@Autowired
	private MutableAclService mutableAclService;

	@Autowired
	private GenericAclController<Award> aclController;


	/********************* Create related methods implementation ***********************/
	@Override
	@Transactional
	public Long createAward(Award award) throws AppException {

		validateInputForCreation(award);

		long awardId = awardDao.createAward(new AwardEntity(award));
		award.setId(awardId);
		
		aclController.createACL(award);
		aclController.createAce(award, CustomPermission.READ);
		aclController.createAce(award, CustomPermission.WRITE);
		aclController.createAce(award, CustomPermission.DELETE);
		
		return awardId;
	}

	private void validateInputForCreation(Award award) throws AppException {
		if (award.getDescription() == null || award.getApplication_id() == null) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(), 400, "Provided data not sufficient for insertion",
					"Please verify that the name is properly generated/set",
					AppConstants.DASH_POST_URL);
		}		
	}

		// ******************** Read related methods implementation **********************
	@Override
	public List<Award> getAward(String orderByInsertionDate) throws AppException {

		if(isOrderByInsertionDateParameterValid(orderByInsertionDate)){
			throw new AppException(
					Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please set either ASC or DESC for the orderByInsertionDate parameter",
					null, AppConstants.DASH_POST_URL);
		}
		List<AwardEntity> awards = awardDao.getAward(orderByInsertionDate);

		return getAwardFromEntities(awards);
	}

	private boolean isOrderByInsertionDateParameterValid(
			String orderByInsertionDate) {
		return orderByInsertionDate!=null
				&& !("ASC".equalsIgnoreCase(orderByInsertionDate) || "DESC".equalsIgnoreCase(orderByInsertionDate));
	}

	@Override
	public Award getAwardById(Long id) throws AppException {
		AwardEntity awardById = awardDao.getAwardById(id);
		if (awardById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The object you requested with id " + id
					+ " was not found in the database",
					"Verify the existence of the object with the id " + id
					+ " in the database", AppConstants.DASH_POST_URL);
		}

		return new Award(awardDao.getAwardById(id));
	}

	private List<Award> getAwardFromEntities(List<AwardEntity> awardEntities) {
		List<Award> response = new ArrayList<Award>();
		for (AwardEntity awardEntity : awardEntities) {
			response.add(new Award(awardEntity));
		}

		return response;
	}

	/********************* UPDATE-related methods implementation ***********************/
	@Override
	@Transactional
	public void updateFullyAward(Award award) throws AppException {
		//do a validation to verify FULL update with PUT
		if (isFullUpdate(award)) {
			throw new AppException(Response.Status.BAD_REQUEST.getStatusCode(),
					400,
					"Please specify all properties for Full UPDATE",
					"required properties - name",
					AppConstants.DASH_POST_URL);
		}

		Award verifyAwardExistenceById = verifyAwardExistenceById(award
				.getId());
		if (verifyAwardExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ award.getId(),
							AppConstants.DASH_POST_URL);
		}

		awardDao.updateAward(new AwardEntity(award));
	}

	/**
	 * Verifies the "completeness" of the award resource sent over the wire
	 *
	 * @param Award
	 * @return
	 */
	private boolean isFullUpdate(Award award) {
		return award.getId() == null
				|| award.getDescription() == null;
	}

	/********************* DELETE-related methods implementation ***********************/

	@Override
	@Transactional
	public void deleteAward(Award award) {

		awardDao.deleteAward(award);
		aclController.deleteACL(award);

	}

	@Override
	@Transactional
	// TODO: This shouldn't exist? If it must, then it needs to accept a list of
	// Awards to delete
	public void deleteAwards() {
		awardDao.deleteAwards();
	}

	@Override
	// TODO: This doesn't need to exist. It is the exact same thing as
	// getAwardById(Long)
	public Award verifyAwardExistenceById(Long id) {
		AwardEntity awardById = awardDao.getAwardById(id);
		if (awardById == null) {
			return null;
		} else {
			return new Award(awardById);
		}
	}

	@Override
	@Transactional
	public void updatePartiallyAward(Award award) throws AppException {
		//do a validation to verify existence of the resource
		Award verifyAwardExistenceById = verifyAwardExistenceById(award.getId());
		if (verifyAwardExistenceById == null) {
			throw new AppException(Response.Status.NOT_FOUND.getStatusCode(),
					404,
					"The resource you are trying to update does not exist in the database",
					"Please verify existence of data in the database for the id - "
							+ award.getId(), AppConstants.DASH_POST_URL);
		}
		copyPartialProperties(verifyAwardExistenceById, award);
		
		awardDao.updateAward(new AwardEntity(verifyAwardExistenceById));
	}

	private void copyPartialProperties(Award verifyAwardExistenceById, Award award) {

		BeanUtilsBean notNull=new NullAwareBeanUtilsBean();
		try {
			notNull.copyProperties(verifyAwardExistenceById, award);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
