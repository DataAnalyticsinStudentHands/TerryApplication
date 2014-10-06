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
import dash.service.ScholarshipService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/scholarship")
public class ScholarshipResource {

	@Autowired
	private ScholarshipService scholarshipService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createScholarship(Scholarship scholarship)
			throws AppException {
		Long createScholarshipId = scholarshipService
				.createScholarship(scholarship);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createScholarshipId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createScholarshipId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Scholarship> getScholarship(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Scholarship> scholarship = scholarshipService
				.getScholarship(orderByInsertionDate);
		return scholarship;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getScholarshipById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Scholarship scholarshipById = scholarshipService.getScholarshipById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Scholarship>(scholarshipById) {
				},
						detailed ? new Annotation[] { ScholarshipDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putScholarshipById(@PathParam("id") Long id,
			Scholarship scholarship) throws AppException {

		Scholarship scholarshipById = scholarshipService
				.verifyScholarshipExistenceById(id);

		if (scholarshipById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createScholarshipObjectId = scholarshipService
					.createScholarship(scholarship);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Scholarship has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../scholarship/"
									+ String.valueOf(createScholarshipObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			scholarshipService.updateFullyScholarship(scholarship);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The scholarship you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../scholarship" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateScholarship(@PathParam("id") Long id,
			Scholarship scholarship) throws AppException {

		scholarshipService.updatePartiallyScholarship(scholarship);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The scholarship you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteScholarship(@PathParam("id") Long id)
			throws AppException {
		Scholarship scholarship = new Scholarship();
		scholarship.setId(id);
		scholarshipService.deleteScholarship(scholarship);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("scholarship successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteScholarships() {
		scholarshipService.deleteScholarships();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All scholarship have been successfully removed")
				.build();
	}

}