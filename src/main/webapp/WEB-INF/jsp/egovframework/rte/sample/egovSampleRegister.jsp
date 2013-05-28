<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
	<head>
	    <c:set var="registerFlag" value="${empty sampleVO.id ? '등록' : '수정'}"/>
	    <title>Sample <c:out value="${registerFlag}"/> for Mobile</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />    
        
        <!-- eGovFrame Common import -->        
        <link rel="stylesheet" href="<c:url value="/css/egovframework/mbl/cmm/jquery.mobile-1.1.1.min.css" />" />
        <link rel="stylesheet" href="<c:url value="/css/egovframework/mbl/cmm/EgovMobile-1.1.1.css" />" />
        <script type="text/javascript" src="<c:url value="/js/egovframework/mbl/cmm/jquery-1.7.1.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/js/egovframework/mbl/cmm/jquery.mobile-1.1.1.min.js" />"></script>
        <script type="text/javascript" src="<c:url value="/js/egovframework/mbl/cmm/EgovMobile-1.1.1.js" />"></script>
        
		<script type="text/javaScript" language="javascript" defer="defer">
		
			/* 글 목록 화면 function */
			function fn_egov_selectList() {
			   	document.detailForm.action = "<c:url value='/sample/egovSampleList.do'/>";
				document.detailForm.submit();		
			}
			
			/* 글 삭제 function */
			function fn_egov_delete() {
		        jConfirm('삭제 하시겠습니까?', '샘플 프로그램', 'g', function(confirm) {
			        if(confirm) {
		                document.detailForm.action = "<c:url value='/sample/deleteSample.do'/>";
		                document.detailForm.submit();        					      
			        }
		        });
			}
			
			/* 글 등록 function */
			function fn_egov_save() {	
				frm = document.detailForm;
		    	frm.action = "<c:url value="${registerFlag == '등록' ? '/sample/addSample.do' : '/sample/updateSample.do'}"/>";
		    	document.detailForm.submit();
			}
		</script>
		
	</head>
	
	<body>
		<!-- page start -->
		<div data-role="page" data-theme="d">
           
            <!-- header start -->
            <div data-role="header" data-theme="g">
                <h1>카테고리  <c:out value="${registerFlag}"/></h1>
                <a href="<c:url value="/sample/egovSampleList.do"/>"  data-ajax="false" data-icon="grid" class="ui-btn-right">목록</a>
            </div>  
            <!-- header end -->
            
            <!-- content start -->      
            <div data-role="content">
            	
            	<form:form commandName="sampleVO" name="detailForm">
            		<c:if test="${registerFlag == '수정'}">
	            	<div data-role="fieldcontain">
						<label for="id">카테고리 ID</label>
                        <form:input id="id" path="id" maxlength="10" readonly="true"/>	
	            	</div>
	            	</c:if>
            		<div data-role="fieldcontain">
                        <label for="name">카테고리명</label>
                        <form:input id="name" path="name" maxlength="30" />
                    </div>  
                    <div data-role="fieldcontain">
                        <label for="description">Description</label>
                        <form:textarea id="description" path="description" cols="58" rows="5" />
                    </div>  
                    <div data-role="fieldcontain">
                        <label for="useYn">사용여부</label>
                        <form:select path="useYn" id="useYn">
								<form:option value="Y">Yes</form:option>
								<form:option value="N">No</form:option>
						</form:select>
                    </div>  
                    <div data-role="fieldcontain">
                        <label for="regUser">등록자</label>
                        <c:if test="${registerFlag == '수정'}">
                        	<form:input id="regUser" path="regUser" maxlength="10" readonly="true"/>
                        </c:if>
                        <c:if test="${registerFlag == '등록'}">
                        	<form:input id="regUser" path="regUser" maxlength="10"/>
                        </c:if>
                    </div> 
        			
        			<fieldset class="ui-grid-a">
	                    <c:if test="${registerFlag == '수정'}">
	                    	<div class="ui-block-a"><a href="javascript:fn_egov_save();" data-role="button" data-theme="b"><c:out value='${registerFlag}'/></a></div>
							<div class="ui-block-b"><a href="javascript:fn_egov_delete();" data-role="button">삭제</a></div>
						</c:if>
					</fieldset>
                    
                    <c:if test="${registerFlag == '등록'}">
                    	<a href="javascript:fn_egov_save();" data-role="button" data-theme="b"><c:out value='${registerFlag}'/></a>
                    </c:if>
                    
	            	<!-- 검색조건 유지 -->
					<input type="hidden" name="searchCondition" value="<c:out value='${searchVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${searchVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
					
            	</form:form>
            	
            </div>	
            <!-- content end --> 
            
		    <!-- footer start -->
            <div data-role="footer" data-theme="g">
                 <h4 class="main">EgovMobile</h4>
            </div>
            <!-- footer end -->   
         
         </div>
         <!-- page end -->
	</body>
</html>