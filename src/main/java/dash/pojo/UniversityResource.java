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
import dash.service.UniversityService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/university")
public class UniversityResource {

	@Autowired
	private UniversityService universityService;

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createUniversity(University university)
			throws AppException {
		Long createUniversityId = universityService
				.createUniversity(university);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity(createUniversityId.toString())
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createUniversityId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<University> getUniversity(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<University> university = universityService
				.getUniversity(orderByInsertionDate);
		return university;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getUniversityById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		University universityById = universityService.getUniversityById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<University>(universityById) {
				},
						detailed ? new Annotation[] { UniversityDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putUniversityById(@PathParam("id") Long id,
			University university) throws AppException {

		University universityById = universityService
				.verifyUniversityExistenceById(id);

		if (universityById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createUniversityObjectId = universityService
					.createUniversity(university);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new University has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../university/"
									+ String.valueOf(createUniversityObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			universityService.updateFullyUniversity(university);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The university you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../university" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateUniversity(@PathParam("id") Long id,
			University university) throws AppException {

		universityService.updatePartiallyUniversity(university);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The university you specified has been successfully updated")
				.build();
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteUniversity(@PathParam("id") Long id)
			throws AppException {
		University university = new University();
		university.setId(id);
		universityService.deleteUniversity(university);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("university successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteUniversitys() {
		universityService.deleteUniversitys();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All university have been successfully removed")
				.build();
	}

}