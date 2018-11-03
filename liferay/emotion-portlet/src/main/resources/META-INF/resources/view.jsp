<%--
Renders React widgets.
--%>
<%@ include file="./init.jsp" %>

<%--suppress JSUnresolvedVariable, JSUnresolvedFunction --%>
<script type="text/javascript">
	Liferay.Loader.require("app-demo");
</script>

<div id="${ns}emotion"></div>
<script data-union-widget="emotion" data-union-container="${ns}emotion" type="application/json"></script>
