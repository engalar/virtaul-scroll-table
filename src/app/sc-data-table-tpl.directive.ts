/**
 * Copyright 2018 Quest Software and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[scDataTableTpl]',
})
export class ScDataTableTplDirective {
  @Input() scDataTableTpl: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
