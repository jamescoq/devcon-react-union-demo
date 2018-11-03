<%--
Renders React widgets.
--%>
<%@ include file="./init.jsp" %>

<%--suppress JSUnresolvedVariable, JSUnresolvedFunction --%>
<script type="text/javascript">
	Liferay.Loader.require("app-demo");
</script>

<div id="${ns}control"></div>
<script data-union-widget="control" data-union-container="${ns}control" type="application/json">
    {
    	"heading": "${heading}",
        "content": "${content}"
    }
</script>
