package eu.reactunion.boilerplate.configuration;

import aQute.bnd.annotation.metatype.Meta;
import com.liferay.portal.configuration.metatype.annotations.ExtendedObjectClassDefinition;
import eu.reactunion.boilerplate.constants.ControlPortletKeys;

/**
 * Configuration class of the Content portlet.
 *
 * @author Roman Srom (roman.srom@lundegaard.eu)
 */
@ExtendedObjectClassDefinition(
        category = "foundation",
        scope = ExtendedObjectClassDefinition.Scope.PORTLET_INSTANCE
)
@Meta.OCD(id = ControlPortletKeys.CONFIGURATION)
public interface ControlConfiguration {

    @Meta.AD(
            required = false,
            deflt = ""
    )
    String heading();

    @Meta.AD(
            required = false,
            deflt = ""
    )
    String content();

}
