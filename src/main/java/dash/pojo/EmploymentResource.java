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
import dash.service.EmploymentService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/employment")
public class EmploymentResource {

	@Autowired
	private EmploymentService employmentService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createEmployment(Employment employment)
			throws AppException {
		Long createEmploymentId = employmentService
				.createEmployment(employment);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createEmploymentId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createEmploymentId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Employment> getEmployment(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Employment> employment = employmentService
				.getEmployment(orderByInsertionDate);
		return employment;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getEmploymentById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Employment employmentById = employmentService.getEmploymentById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Employment>(employmentById) {
				},
						detailed ? new Annotation[] { EmploymentDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putEmploymentById(@PathParam("id") Long id,
			Employment employment) throws AppException {

		Employment employmentById = employmentService
				.verifyEmploymentExistenceById(id);

		if (employmentById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createEmploymentObjectId = employmentService
					.createEmployment(employment);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Employment has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../employment/"
									+ String.valueOf(createEmploymentObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			employmentService.updateFullyEmployment(employment);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The employment you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../employment" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateEmployment(@PathParam("id") Long id,
			Employment employment) throws AppException {

		employmentService.updatePartiallyEmployment(employment);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The employment you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteEmployment(@PathParam("id") Long id)
			throws AppException {
		Employment employment = new Employment();
		employment.setId(id);
		employmentService.deleteEmployment(employment);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("employment successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteEmployments() {
		employmentService.deleteEmployments();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All employment have been successfully removed")
				.build();
	}

}