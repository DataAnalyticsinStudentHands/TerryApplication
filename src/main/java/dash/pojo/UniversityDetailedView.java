package dash.pojo;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.glassfish.hk2.api.AnnotationLiteral;
import org.glassfish.jersey.message.filtering.EntityFiltering;

@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@EntityFiltering
public @interface UniversityDetailedView {

	/**
	 * Factory class for creating instances of {@code ProjectDetailedView} annotation.
	 */
	public static class Factory extends AnnotationLiteral<UniversityDetailedView>
			implements UniversityDetailedView {
		
		private Factory() {
		}

		public static UniversityDetailedView get() {
			return new Factory();
		}
	}
}
