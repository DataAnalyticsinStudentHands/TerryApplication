package dash.pojo;

import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dash.errorhandling.AppException;
import dash.service.ApplicationService;

/**
 * 
 * Service Class that handles REST requests for Applications
 * 
 * @author plindner
 */
@Component
@Path("/applications")
public class ApplicationResource {

	@Autowired
	private ApplicationService applicationService;

	private static final String APPLICATION_UPLOAD_LOCATION_FOLDER = "/srv/uploads/terry_application";
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response createApplication(Application application)
			throws AppException {
		Long createApplicationId = applicationService
				.createApplication(application);
		return Response.status(Response.Status.CREATED)
				// 201
				.entity("A new application has been created")
				.header("Location",
						"http://..../applications/"
								+ String.valueOf(createApplicationId)).build();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Application> getApplications(
			@QueryParam("orderByInsertionDate") String orderByInsertionDate)
			throws IOException, AppException {
		List<Application> applications = applicationService
				.getApplications(orderByInsertionDate);
		return applications;
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response getApplicationById(@PathParam("id") Long id,
			@QueryParam("detailed") boolean detailed) throws IOException,
			AppException {
		Application applicaionById = applicationService.getApplicationById(id);
		return Response
				.status(200)
				.entity(new GenericEntity<Application>(applicaionById) {
				},
						detailed ? new Annotation[] { ApplicationDetailedView.Factory
								.get() } : new Annotation[0])
				.header("Access-Control-Allow-Headers", "X-extra-header")
				.allow("OPTIONS").build();
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response putApplicationById(@PathParam("id") Long id,
			Application application) throws AppException {

		Application applicationById = applicationService
				.verifyApplicationExistenceById(id);

		if (applicationById == null) {
			// resource not existent yet, and should be created under the
			// specified URI
			Long createApplictionObjectId = applicationService
					.createApplication(application);
			return Response
					.status(Response.Status.CREATED)
					// 201
					.entity("A new application has been created AT THE LOCATION you specified")
					.header("Location",
							"http://.../applications/"
									+ String.valueOf(createApplictionObjectId))
					.build();
		} else {
			// resource is existent and a full update should occur
			applicationService.updateFullyApplication(application);
			return Response
					.status(Response.Status.OK)
					// 200
					.entity("The application you specified has been fully updated created AT THE LOCATION you specified")
					.header("Location",
							"http://.../applications" + String.valueOf(id))
					.build();
		}
	}

	// PARTIAL update
	@POST
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_HTML })
	public Response partialUpdateApplication(@PathParam("id") Long id,
			Application application) throws AppException {
//		application.setId(id);
		applicationService.updatePartiallyApplication(application);
		return Response
				.status(Response.Status.OK)
				// 200
				.entity("The application you specified has been successfully updated")
				.build();
	}
	
	@POST
	@Path("/upload")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	public Response uploadFile(
			@QueryParam("id") Long id,
		@FormDataParam("file") InputStream uploadedInputStream,
		@FormDataParam("file") FormDataContentDisposition fileDetail,
		@HeaderParam("Content-Length") final long fileSize) throws AppException {
		
		Application application= applicationService.getApplicationById(id);
		
		String uploadedFileLocation = APPLICATION_UPLOAD_LOCATION_FOLDER+"/"+application.getDocument_folder()+"/" + fileDetail.getFileName();
		// save it
		applicationService.uploadFile(uploadedInputStream, uploadedFileLocation, application);
 
		String output = "File uploaded to : " + uploadedFileLocation;
 
		return Response.status(200).entity(output).build();
 
	}

	/*
	 * *********************************** DELETE
	 * ***********************************
	 */
	@DELETE
	@Path("{id}")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteApplication(@PathParam("id") Long id)
			throws AppException {
		Application application = new Application();
		application.setId(id);
		applicationService.deleteApplication(application);
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("Application successfully removed from database")
				.build();
	}

	@DELETE
	@Path("admin")
	@Produces({ MediaType.TEXT_HTML })
	public Response deleteApplications() {
		applicationService.deleteApplications();
		return Response.status(Response.Status.NO_CONTENT)
				// 204
				.entity("All applications have been successfully removed")
				.build();
	}

}