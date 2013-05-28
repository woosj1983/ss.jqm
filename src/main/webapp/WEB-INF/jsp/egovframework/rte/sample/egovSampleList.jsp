<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
	<head>
	    <title>Basic Board List for Mobile</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />    
        
        <!-- eGovFrame Common import -->        
        <link rel="stylesheet" href="<c:url value="/css/egovframework/mbl/cmm/jquery.mobile-1.1.1.min.css" />" />
        <link rel="stylesheet" href="<c:url value="/css/egovframework/mbl/cmm/EgovMobile-1.1.1.css" />" />
        <script type="text/javascript" src="<c:url value="/js/egovframework/mbl/cmm/jquery-1.7.1.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/js/egovframework/mbl/cmm/jquery.mobile-1.1.1.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/js/egovframework/mbl/cmm/EgovMobile-1.1.1.js" />"></script>
    	
    	<link rel="stylesheet" href="<c:url value="/css/egovframework/mbl/sample/EgovSample.css" />" />
   
		<script type="text/javaScript" language="javascript" defer="defer">
			/* 글 수정 화면 function */
			function fn_egov_select(id) {
				document.listForm.selectedId.value = id;
			   	document.listForm.action = "<c:url value='/sample/updateSampleView.do'/>";
			   	document.listForm.submit();
			}
			
			/* 글 등록 화면 function */
			function fn_egov_addView() {
			   	document.listForm.action = "<c:url value='/sample/addSampleView.do'/>";
			   	document.listForm.submit();
			}
			
			/* 글 목록 화면 function */
			function fn_egov_selectList() {
				document.listForm.pageIndex.value = "1";
				document.listForm.action = "<c:url value='/sample/egovSampleList.do'/>";
			   	document.listForm.submit();	
			}
			
			/* pagination 페이지 링크 function */
			function fn_egov_link_page(pageNo){
				document.listForm.pageIndex.value = pageNo;
				document.listForm.action = "<c:url value='/sample/egovSampleList.do'/>";
			   	document.listForm.submit();
			}

			/* 검색 구분 변경 function */
			function fn_egov_search_choice(searchCondition, searchConditionText){
				if (searchCondition != -1) {
				    $('#searchCondition').val(searchCondition);
				    $('#searchConditionText').text(searchConditionText);
				}				
                $('#searchSelect').toggle('selectDisplay');
			}

			$('[data-role="page"]').live('pageshow', function(){
				$('#searchKeyword').keydown(function(event) {
				    if(event.keyCode == 13) {
		                return false;
				    }
				});
			});
			
		</script>
		
		<style type="text/css">
		    .selectDisplay { display:block }
		</style>
		
	</head>
	
	<body>
		
		<!-- page start -->
		<div data-role="page" data-theme="d">
            
            <!-- header start -->
            <div data-role="header" data-position="inline" data-theme="g">
                <h1>카테고리 목록</h1>
                <a href="javascript:fn_egov_addView();" data-ajax="false" data-icon="plus" class="ui-btn-right">등록</a>
            </div>  
            <!-- header end -->
            
            <!-- content start -->      
            <div data-role="content">
            	
            	<form:form name="listForm" method="post" commandName="searchVO1" >
            	    <input type="hidden" name="selectedId" id="selectedId" />
		            <div id="search">
		                <fieldset>
		                    <div class="search-wrap">
		                        <div class="select-box">
		                            <input type="hidden" id="searchCondition" name="searchCondition" value="<c:out value='${param.searchCondition}' default="1"/>"/>		                            
		                            <a href="javascript:fn_egov_search_choice(-1, 'Name')"><span id="searchConditionText"><c:out value='${(param.searchCondition == "0") ? "ID" : "Name"}' default="Name" /></span></a>
		                            <ul class="select-box-options" id="searchSelect" style="z-index:999;display:none">
		                                <li><span><a href="javascript:fn_egov_search_choice(1, 'Name');" data-role="none">Name</a></span></li>
		                                <li><span><a href="javascript:fn_egov_search_choice(0, 'ID');" data-role="none">ID</a></span></li>
		                            </ul>
		                        </div>
		                        <input type="text" name="searchKeyword" id="searchKeyword" data-role="none" class="q" autocomplete="off" value="<c:out value='${param.searchKeyword}'/>" />
		                    </div>
		                    <button type="button" id="searchSubmit" data-role="none" onclick="javascript:fn_egov_selectList();"><span><strong>검색</strong></span></button>
		                </fieldset>
		            </div>

                   	<ul data-role="listview" data-inset="true" data-dividertheme="a"> 
	            		<c:forEach var="result" items="${resultList}" varStatus="status">
		            		<li data-role="list-divider">
		            			ID : <c:out value="${result.id}"/>
		            		</li>
		            		<li><a href="javascript:fn_egov_select('<c:out value="${result.id}"/>');">
		            			<h3><c:out value="${result.name}"/></h3>
		            			<p><strong>사용여부: <c:out value="${result.useYn}"/></strong></p>
		            			<br>
		            			<p><c:out value="${result.description}"/></p>
		            			<p class="ui-li-aside">작성자 : <c:out value="${result.regUser}"/></p>
		            		</a></li>
	            		</c:forEach>
            		</ul>
            		<div class="com-egovPaging">
						<ui:pagination paginationInfo = "${paginationInfo}"
						   type="image"
						   jsFunction="fn_egov_link_page" />
					</div>
					<form:hidden path="pageIndex" id="pageIndex"  />
            	</form:form>
            </div>	
            <!-- content end --> 
            
		    <!-- footer start -->
            <div data-role="footer" data-theme="g">
                 <h4>EgovMobile</h4>
            </div>
            <!-- footer end -->   
         
         </div>
         <!-- page end -->
	</body>
</html>