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
import dash.service.ActivityService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/activity")
public class ActivityResource {

	@Autowired
	private ActivityService activityService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createActivity(Activity activity)
			throws AppException {
		Long createActivityId = activityService
				.createActivity(activity);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createActivityId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createActivityId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Activity> getActivity(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Activity> activity = activityService
				.getActivity(orderByInsertionDate);
		return activity;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getActivityById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Activity activityById = activityService.getActivityById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Activity>(activityById) {
				},
						detailed ? new Annotation[] { ActivityDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putActivityById(@PathParam("id") Long id,
			Activity activity) throws AppException {

		Activity activityById = activityService
				.verifyActivityExistenceById(id);

		if (activityById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createActivityObjectId = activityService
					.createActivity(activity);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Activity has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../activity/"
									+ String.valueOf(createActivityObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			activityService.updateFullyActivity(activity);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The activity you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../activity" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateActivity(@PathParam("id") Long id,
			Activity activity) throws AppException {

		activityService.updatePartiallyActivity(activity);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The activity you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteActivity(@PathParam("id") Long id)
			throws AppException {
		Activity activity = new Activity();
		activity.setId(id);
		activityService.deleteActivity(activity);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("activity successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteActivitys() {
		activityService.deleteActivitys();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All activity have been successfully removed")
				.build();
	}

}