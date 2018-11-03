package eu.reactunion.boilerplate.configuration;

import com.liferay.portal.kernel.settings.definition.ConfigurationPidMapping;
import eu.reactunion.boilerplate.constants.ControlPortletKeys;
import org.osgi.service.component.annotations.Component;

/**
 * @author Roman Srom (roman.srom@lundegaard.eu)
 */
@Component
public class ControlConfigurationPidMapping implements ConfigurationPidMapping {

    @Override
    public Class<?> getConfigurationBeanClass() {
        return ControlConfiguration.class;
    }

    @Override
    public String getConfigurationPid() {
        return ControlPortletKeys.CONTROL;
    }
}
