/**
 * @copyright Copyright (c) 2021 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

describe('The apps', function() {
	describe('Collectives', function() {

		it('allows creating a new collective', function() {
			cy.loginAs('jane')
			cy.visit('apps/collectives')
			cy.get('#app-navigation-vue')
				.should('contain', 'New collective')
		})
	})

	/**
	 * Regression test for #110 and #117.
	 * Without the circles app the whole server became unresponsive.
	 * If we have this regression this test will not only fail
	 * it will also break all following tests.
	 *
	 */
	describe('Disabled circles app does not break files view', function() {

		before(function() {
			cy.loginAs('admin')
			cy.disableApp('circles')
		})

		after(function() {
			cy.loginAs('admin')
			cy.enableApp('circles')
		})

		it('Renders the default files list', function() {
			cy.loginAs('jane')
			cy.visit('apps/files')
			cy.fileList().should('contain', 'welcome')
		})

	})
})
