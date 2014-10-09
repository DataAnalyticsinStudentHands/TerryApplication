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
import dash.service.VolunteerService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/volunteer")
public class VolunteerResource {

	@Autowired
	private VolunteerService volunteerService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createVolunteer(Volunteer volunteer)
			throws AppException {
		Long createVolunteerId = volunteerService
				.createVolunteer(volunteer);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createVolunteerId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createVolunteerId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Volunteer> getVolunteer(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Volunteer> volunteer = volunteerService
				.getVolunteer(orderByInsertionDate);
		return volunteer;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getVolunteerById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Volunteer volunteerById = volunteerService.getVolunteerById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Volunteer>(volunteerById) {
				},
						detailed ? new Annotation[] { VolunteerDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putVolunteerById(@PathParam("id") Long id,
			Volunteer volunteer) throws AppException {

		Volunteer volunteerById = volunteerService
				.verifyVolunteerExistenceById(id);

		if (volunteerById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createVolunteerObjectId = volunteerService
					.createVolunteer(volunteer);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Volunteer has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../volunteer/"
									+ String.valueOf(createVolunteerObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			volunteerService.updateFullyVolunteer(volunteer);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The volunteer you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../volunteer" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateVolunteer(@PathParam("id") Long id,
			Volunteer volunteer) throws AppException {

		volunteerService.updatePartiallyVolunteer(volunteer);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The volunteer you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteVolunteer(@PathParam("id") Long id)
			throws AppException {
		Volunteer volunteer = new Volunteer();
		volunteer.setId(id);
		volunteerService.deleteVolunteer(volunteer);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("volunteer successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteVolunteers() {
		volunteerService.deleteVolunteers();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All volunteer have been successfully removed")
				.build();
	}

}