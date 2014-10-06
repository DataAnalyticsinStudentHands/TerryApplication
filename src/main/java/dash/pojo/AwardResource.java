package dash.pojo;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dash.errorhandling.AppException;
import dash.service.AwardService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/award")
public class AwardResource {

	@Autowired
	private AwardService awardService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createAward(Award award)
			throws AppException {
		Long createAwardId = awardService
				.createAward(award);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createAwardId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createAwardId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Award> getAward(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Award> award = awardService
				.getAward(orderByInsertionDate);
		return award;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getAwardById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Award awardById = awardService.getAwardById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Award>(awardById) {
				},
						detailed ? new Annotation[] { AwardDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putAwardById(@PathParam("id") Long id,
			Award award) throws AppException {

		Award awardById = awardService
				.verifyAwardExistenceById(id);

		if (awardById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createAwardObjectId = awardService
					.createAward(award);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Award has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../award/"
									+ String.valueOf(createAwardObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			awardService.updateFullyAward(award);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The award you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../award" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateAward(@PathParam("id") Long id,
			Award award) throws AppException {

		awardService.updatePartiallyAward(award);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The award you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteAward(@PathParam("id") Long id)
			throws AppException {
		Award award = new Award();
		award.setId(id);
		awardService.deleteAward(award);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("award successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteAwards() {
		awardService.deleteAwards();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All award have been successfully removed")
				.build();
	}

}