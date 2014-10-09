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
import dash.service.CourseworkService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/coursework")
public class CourseworkResource {

	@Autowired
	private CourseworkService courseworkService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createCoursework(Coursework coursework)
			throws AppException {
		Long createCourseworkId = courseworkService
				.createCoursework(coursework);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createCourseworkId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createCourseworkId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Coursework> getCoursework(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Coursework> coursework = courseworkService
				.getCoursework(orderByInsertionDate);
		return coursework;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getCourseworkById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Coursework courseworkById = courseworkService.getCourseworkById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Coursework>(courseworkById) {
				},
						detailed ? new Annotation[] { CourseworkDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putCourseworkById(@PathParam("id") Long id,
			Coursework coursework) throws AppException {

		Coursework courseworkById = courseworkService
				.verifyCourseworkExistenceById(id);

		if (courseworkById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createCourseworkObjectId = courseworkService
					.createCoursework(coursework);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Coursework has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../coursework/"
									+ String.valueOf(createCourseworkObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			courseworkService.updateFullyCoursework(coursework);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The coursework you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../coursework" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateCoursework(@PathParam("id") Long id,
			Coursework coursework) throws AppException {

		courseworkService.updatePartiallyCoursework(coursework);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The coursework you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteCoursework(@PathParam("id") Long id)
			throws AppException {
		Coursework coursework = new Coursework();
		coursework.setId(id);
		courseworkService.deleteCoursework(coursework);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("coursework successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteCourseworks() {
		courseworkService.deleteCourseworks();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All coursework have been successfully removed")
				.build();
	}

}