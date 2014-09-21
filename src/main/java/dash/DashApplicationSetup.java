package dash;

import java.lang.annotation.Annotation;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.message.filtering.EntityFilteringFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spring.scope.RequestContextFilter;

import dash.errorhandling.AppExceptionMapper;
import dash.errorhandling.GenericExceptionMapper;
import dash.errorhandling.NotFoundExceptionMapper;
import dash.filters.LoggingResponseFilter;
import dash.pojo.ActivityResource;
import dash.pojo.ActivityDetailedView;
import dash.pojo.AwardResource;
import dash.pojo.AwardDetailedView;
import dash.pojo.ApplicationResource;
import dash.pojo.ApplicationDetailedView;
import dash.pojo.ChildResource;
import dash.pojo.ChildDetailedView;
import dash.pojo.CourseworkResource;
import dash.pojo.CourseworkDetailedView;
import dash.pojo.EmploymentResource;
import dash.pojo.EmploymentDetailedView;
import dash.pojo.ScholarshipResource;
import dash.pojo.ScholarshipDetailedView;
import dash.pojo.UniversityDetailedView;
import dash.pojo.UniversityResource;
import dash.pojo.UserDetailedView;
import dash.pojo.UsersResource;
import dash.pojo.VolunteerDetailedView;
import dash.pojo.VolunteerResource;

/**
 * Registers the components to be used by the JAX-RS application
 *
 * @author plindner
 *
 */
public class DashApplicationSetup extends ResourceConfig {

	/**
	 * Register JAX-RS application components.
	 */
	public DashApplicationSetup() {
		// register application resources
		register(ActivityResource.class);
		register(ApplicationResource.class);
		register(AwardResource.class);
		register(ChildResource.class);
		register(CourseworkResource.class);
		register(EmploymentResource.class);
		register(ScholarshipResource.class);
		register(UniversityResource.class);
		register(UsersResource.class);
		register(VolunteerResource.class);

		// register filters
		register(RequestContextFilter.class);
		register(LoggingResponseFilter.class);

		// register exception mappers
		register(GenericExceptionMapper.class);
		register(AppExceptionMapper.class);
		register(NotFoundExceptionMapper.class);

		// register features
		register(JacksonFeature.class);
		register(MultiPartFeature.class);
		register(EntityFilteringFeature.class);
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { ActivityDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { ApplicationDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { AwardDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { ChildDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { CourseworkDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { EmploymentDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { ScholarshipDetailedView.Factory.get() });

		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { UniversityDetailedView.Factory.get() });

		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { UserDetailedView.Factory.get() });
		
		property(EntityFilteringFeature.ENTITY_FILTERING_SCOPE,
				new Annotation[] { VolunteerDetailedView.Factory.get() });
		
	}
}