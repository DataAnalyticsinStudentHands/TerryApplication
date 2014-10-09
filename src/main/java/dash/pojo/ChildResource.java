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
import dash.service.ChildService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/child")
public class ChildResource {

	@Autowired
	private ChildService childService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createChild(Child child)
			throws AppException {
		Long createChildId = childService
				.createChild(child);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createChildId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createChildId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Child> getChild(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Child> child = childService
				.getChild(orderByInsertionDate);
		return child;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getChildById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Child childById = childService.getChildById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Child>(childById) {
				},
						detailed ? new Annotation[] { ChildDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putChildById(@PathParam("id") Long id,
			Child child) throws AppException {

		Child childById = childService
				.verifyChildExistenceById(id);

		if (childById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createChildObjectId = childService
					.createChild(child);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new Child has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../child/"
									+ String.valueOf(createChildObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			childService.updateFullyChild(child);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The child you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../child" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateChild(@PathParam("id") Long id,
			Child child) throws AppException {

		childService.updatePartiallyChild(child);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The child you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteChild(@PathParam("id") Long id)
			throws AppException {
		Child child = new Child();
		child.setId(id);
		childService.deleteChild(child);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("child successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteChilds() {
		childService.deleteChilds();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All child have been successfully removed")
				.build();
	}

}