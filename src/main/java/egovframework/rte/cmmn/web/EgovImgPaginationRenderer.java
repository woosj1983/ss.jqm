/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.rte.cmmn.web;

import egovframework.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;

public class EgovImgPaginationRenderer extends AbstractPaginationRenderer {
        
        public EgovImgPaginationRenderer() {
            firstPageLabel = "<a href=\"javascript:{0}({1}); return false;\" class=\"first\" onclick=\"{0}({1}); return false;\">" +        "</a>"; 
            previousPageLabel = "<a href=\"javascript:{0}({1}); return false;\" class=\"prev\" onclick=\"{0}({1}); return false;\">" + "</a>";
            currentPageLabel = "<span><strong>{0}</strong></span>";
            otherPageLabel = "<span><a href=\"javascript:{0}({1});\" data-role=\"none\">{2}</a></span>";
            nextPageLabel = "<a href=\"javascript:{0}({1}); return false;\" class=\"next\" onclick=\"{0}({1}); return false;\">" + "</a>";
            lastPageLabel = "<a href=\"javascript:{0}({1}); return false;\" class=\"last\" onclick=\"{0}({1}); return false;\">" + "</a>";
        }
}
